package com.resume.backend.service;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class ResumeServiceImpl implements ResumeService {

    private final ChatClient chatClient;

    public ResumeServiceImpl(ChatClient.Builder builder) {
        this.chatClient = builder.build();
    }

    @Override
    public Map<String, Object> generateResumeResponse(String userResumeDescription) throws IOException {

        String promptString = this.loadPromptFromFile("resume_prompt.txt");
        String promptContent = this.putValuesToTemplate(promptString, Map.of(
                "userDescription", userResumeDescription
        ));
        
        Prompt prompt = new Prompt(promptContent);
        String response = chatClient.prompt(prompt).call().content();
        
        return parseMultipleResponses(response);
    }

    // UPDATED: Docker aur Cloud (Render) ke liye sahi tareeka file padhne ka
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

        // 1. Extract content inside <think> tags (Gemini mostly won't use this, but kept for safety)
        int thinkStart = response.indexOf("<think>") + 7;
        int thinkEnd = response.indexOf("</think>");
        if (thinkStart > 6 && thinkEnd != -1) {
            String thinkContent = response.substring(thinkStart, thinkEnd).trim();
            jsonResponse.put("think", thinkContent);
        } else {
            jsonResponse.put("think", null);
        }

        // 2. Extract content that is in JSON format
        // Gemini updates: Handle cases with and without markdown code blocks
        String jsonContent = response;
        int jsonStart = response.indexOf("```json");
        int jsonEnd = response.lastIndexOf("```");

        if (jsonStart != -1 && jsonEnd != -1 && jsonEnd > jsonStart) {
            // Agar markdown blocks hain toh unhe use karo
            jsonContent = response.substring(jsonStart + 7, jsonEnd).trim();
        } else {
            // Agar markdown nahi hai, toh dekho shayad seedha JSON start ho raha ho '{' se
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
            jsonResponse.put("data", null);
            System.err.println("Invalid JSON format in the response: " + e.getMessage());
            // Debugging ke liye raw response print kar sakte hain
            System.err.println("Raw Response: " + response);
        }

        return jsonResponse;
    }
}