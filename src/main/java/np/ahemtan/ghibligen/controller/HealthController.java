package np.ahemtan.ghibligen.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/health")
@CrossOrigin(origins = {"http://localhost:3000", "https://127.0.0.1:3000"})
public class HealthController {
    @GetMapping
    public String health() {
        return ResponseEntity.ok().body("OK").getBody();
    }
}
