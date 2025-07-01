package np.ahemtan.ghibligen.dto;

import lombok.Data;

@Data
public class TextGenerationRequestsDTO {

    private String prompt;

    private String styles;
}
