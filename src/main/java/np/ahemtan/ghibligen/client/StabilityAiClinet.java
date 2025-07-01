package np.ahemtan.ghibligen.client;

import np.ahemtan.ghibligen.dto.TextToImageRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@FeignClient(name = "stability-ai", url = "${stability.api.base.url}", configuration = np.ahemtan.ghibligen.config.FeignConfig.class)

public interface StabilityAiClinet {
        @PostMapping(value = "/v1/generation/{engine_id}/text-to-image", consumes = MediaType.APPLICATION_JSON_VALUE, headers = {
                        "Accept=image/png" })

        byte[] generateImageFromText(
                        @RequestHeader("Authorization") String auth,
                        @PathVariable("engine_id") String engine_id,
                        @RequestBody TextToImageRequest requestBody);

        @PostMapping(value = "/v1/generation/{engine_id}/image-to-image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, headers = {
                        "Accept=image/png" })
        byte[] generateImageFromImage(
                        @RequestHeader("Authorization") String auth,
                        @PathVariable("engine_id") String engine_id,
                        @RequestPart("init_image") MultipartFile initImage,
                        @RequestPart("text_prompts[0][text]") String textPrompt,
                        @RequestPart("style_preset") String style);
}
