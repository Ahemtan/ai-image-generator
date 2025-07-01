package np.ahemtan.ghibligen;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients

public class GhibligenApplication {

	public static void main(String[] args) {
		SpringApplication.run(GhibligenApplication.class, args);
	}

}
