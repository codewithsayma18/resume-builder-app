package com.resume.backend.service;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class ResumeServiceImpl implements ResumeService {

    private static final Logger logger = LoggerFactory.getLogger(ResumeServiceImpl.class);
    private final ChatClient chatClient;

    public ResumeServiceImpl(ChatClient.Builder builder) {
        this.chatClient = builder.build();
    }

    @Override
    public Map<String, Object> generateResumeResponse(String userResumeDescription) throws IOException {
        
        // 1. Prompt file load karo
        String promptString = this.loadPromptFromFile("resume_prompt.txt");
        
        // 2. Dynamic values replace karo
        String promptContent = this.putValuesToTemplate(promptString, Map.of(
                "userDescription", userResumeDescription
        ));
        
        // 3. AI ko call karo
        Prompt prompt = new Prompt(promptContent);
        String response = chatClient.prompt(prompt).call().content();
        
        // Logger me response print karo taki pata chale AI ne kya bheja
        logger.info("AI Response received: {}", response);

        // 4. Response parse karke return karo
        return parseMultipleResponses(response);
    }

    // Docker/Cloud compatible file loader
    String loadPromptFromFile(String filename) throws IOException {
        Resource resource = new ClassPathResource(filename);
        try (InputStream inputStream = resource.getInputStream()) {
            return new String(inputStream.readAllBytes(), StandardCharsets.UTF_8);
        }
    }

    String putValuesToTemplate(String template, Map<String, String> values) {
        for (Map.Entry<String, String> entry : values.entrySet()) {
            template = template.replace("{{" + entry.getKey() + "}}", entry.getValue());
        }
        return template;
    }

    public static Map<String, Object> parseMultipleResponses(String response) {
        Map<String, Object> jsonResponse = new HashMap<>();

        // 1. Extract content inside <think> tags (Optional handling)
        int thinkStart = response.indexOf("<think>");
        int thinkEnd = response.indexOf("</think>");
        if (thinkStart != -1 && thinkEnd != -1) {
            String thinkContent = response.substring(thinkStart + 7, thinkEnd).trim();
            jsonResponse.put("think", thinkContent);
            // Main response se think tag hata do taki JSON parsing clean rahe
            response = response.substring(thinkEnd + 8).trim(); 
        } else {
            jsonResponse.put("think", null);
        }

        // 2. Extract JSON content
        String jsonContent = response;
        int jsonStart = response.indexOf("```json");
        int jsonEnd = response.lastIndexOf("```");

        if (jsonStart != -1 && jsonEnd != -1 && jsonEnd > jsonStart) {
            jsonContent = response.substring(jsonStart + 7, jsonEnd).trim();
        } else {
            // Fallback: Agar markdown nahi hai toh '{' aur '}' dhoondo
            int firstBrace = response.indexOf("{");
            int lastBrace = response.lastIndexOf("}");
            if (firstBrace != -1 && lastBrace != -1) {
                jsonContent = response.substring(firstBrace, lastBrace + 1).trim();
            }
        }

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            Map<String, Object> dataContent = objectMapper.readValue(jsonContent, Map.class);
            jsonResponse.put("data", dataContent);
        } catch (Exception e) {
            logger.error("JSON Parsing Failed. Raw Response: {}", response, e);
            jsonResponse.put("data", null);
            jsonResponse.put("error", "Invalid JSON format received from AI");
        }

        return jsonResponse;
    }
}