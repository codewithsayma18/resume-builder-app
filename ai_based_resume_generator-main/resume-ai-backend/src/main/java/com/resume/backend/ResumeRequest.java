package com.resume.backend;

// Agar validation dependency add ki hai toh ye import karo
// import jakarta.validation.constraints.NotBlank; 

public record ResumeRequest(
    
    // @NotBlank(message = "Description is required") // Optional: Validation ke liye
    String userDescription
) {
}