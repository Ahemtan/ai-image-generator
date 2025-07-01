package np.ahemtan.ghibligen.config;

import feign.codec.Encoder;
import feign.form.spring.SpringFormEncoder;
import org.springframework.cloud.openfeign.support.SpringEncoder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.boot.autoconfigure.http.HttpMessageConverters;
import org.springframework.web.client.RestTemplate;

@Configuration

public class FeignConfig {
    @Bean
    public Encoder feignFromEncoder() {
        return new SpringFormEncoder(
                new SpringEncoder(() -> new HttpMessageConverters(new RestTemplate().getMessageConverters()))
        );
    }
}
