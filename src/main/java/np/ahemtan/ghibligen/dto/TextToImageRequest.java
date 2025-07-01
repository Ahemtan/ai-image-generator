package np.ahemtan.ghibligen.dto;

import java.util.List;

public class TextToImageRequest {

    private List<TextPrompt> text_prompts;
    private double cfg_scale = 7;
    private int height = 512;
    private int width = 768;
    private int samples = 1;
    private String styles_preset;
    private int steps = 20;

    public static class TextPrompt {
        private String text;

        public TextPrompt(String text) {
            this.text = text;
        }

        public String getText() {
            return text;
        }

        public void setText(String text) {
            this.text = text;
        }
   }

   public  TextToImageRequest(String text, String styles) {
        this.text_prompts = List.of(new TextPrompt(text));
        this.styles_preset = styles;
   }

    public List<TextPrompt> getText_prompts() {
        return text_prompts;
    }

    public double getCfg_scale() {
        return cfg_scale;
    }

    public int getHeight() {
        return height;
    }

    public int getWidth() {
        return width;
    }

    public int getSamples() {
        return samples;
    }

    public void setSamples(int samples) {
        this.samples = samples;
    }

    public String getStyles_preset() {
        return styles_preset;
    }

    public int getSteps() {
        return steps;
    }
}
