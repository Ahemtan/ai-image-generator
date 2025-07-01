package np.ahemtan.ghibligen.services;

import np.ahemtan.ghibligen.client.StabilityAiClinet;
import np.ahemtan.ghibligen.dto.TextToImageRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class GhibliArtService {

    private final StabilityAiClinet stabilityAiClient;
    private final String apiKey;

    public GhibliArtService(StabilityAiClinet stabilityAiClient, @Value("${stability.api.key}") String apiKey) {
        this.stabilityAiClient = stabilityAiClient;
        this.apiKey = apiKey;
    }

    public byte[] generateImage(MultipartFile image, String prompt) {
        String finalPrompt = prompt + ", in the beautiful, detailed  style of studio ghibli.";
        String engineId = "stable-diffusion-v1-6";
        String stylePreset = "anime";

        return stabilityAiClient.generateImageFromImage(
                "Bearer " + apiKey,
                engineId,
                image,
                finalPrompt,
                stylePreset
        );
    }

    String getStyledPrompt(String prompt, String style) {
        String styleDescriptor = switch (style.toLowerCase()) {
            case "ghibli" -> "in the style of Studio Ghibli, whimsical, soft colors, dreamy atmosphere";
            case "disney" -> "in the style of Disney animation, magical, charming, expressive characters";
            case "cartoon" -> "cartoon-style, bold outlines, exaggerated expressions, playful mood";
            case "pixel_art" -> "pixel art, retro game style, 16-bit, vibrant and blocky";
            case "anime", "general" -> "anime-style, vibrant, detailed eyes, dynamic composition";
            default -> "high quality digital illustration";
        };

        return prompt + ", " + styleDescriptor;
    }


    public byte[] createImageFromText(String prompt, String style) {

        String finalPrompt = getStyledPrompt(prompt, style);
        String engineId = "stable-diffusion-v1-6";
        String stylePreset = style.equals("general") ? "anime" : style.replace("_", "-");

        TextToImageRequest textToImageRequest = new TextToImageRequest(finalPrompt, stylePreset);

        return stabilityAiClient.generateImageFromText(
                "Bearer " + apiKey,
                engineId,
                textToImageRequest
        );
    }


}
