package np.ahemtan.ghibligen.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import np.ahemtan.ghibligen.dto.TextGenerationRequestsDTO;
import np.ahemtan.ghibligen.services.GhibliArtService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import utils.GlobalExceptionHandler;

@Slf4j
@RestController
@RequestMapping(value = "/api/v1")
@CrossOrigin(origins = { "http://localhost:3000", "https://127.0.0.1:3000", "http://192.168.1.8:3000/" })
@RequiredArgsConstructor
public class GenerationController {

    private final GhibliArtService ghibliArtService;

    @PostMapping(value = "/generate", produces = {MediaType.IMAGE_PNG_VALUE})
    public ResponseEntity<byte[]> generateGhibliArt(
            @RequestParam("image") MultipartFile image,
            @RequestParam("prompt") String prompt) {
        try {

            if (image == null || prompt == null) {
                throw new IllegalArgumentException("Image and prompt are required");
            }

            byte[] imagesByte = ghibliArtService.generateImage(image, prompt);
            return ResponseEntity.ok().contentType(MediaType.IMAGE_PNG).body(imagesByte);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping(value = "/generate-from-text", produces = { MediaType.IMAGE_PNG_VALUE })
    public ResponseEntity<byte[]> generateGhibliArtFromText(@Valid  @RequestBody TextGenerationRequestsDTO requestDto) {
        try {
            byte[] imagesByte = ghibliArtService.createImageFromText(requestDto.getPrompt(), requestDto.getStyles());
            return ResponseEntity.ok().contentType(MediaType.IMAGE_PNG).body(imagesByte);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
}