package common.server;

import common.server.domain.Hotel;
import common.server.domain.User;
import common.server.enums.ProductType;
import common.server.repository.HotelRepository;
import common.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Arrays;

@SpringBootApplication
public class ServerApplication implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(ServerApplication.class, args);
    }

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private HotelRepository hotelRepository;

    @Autowired
    private BCryptPasswordEncoder encoder;

    @Override
    public void run(String... args) throws Exception {

        if (userRepository.count() == 0) {

            User admin = new User();
            admin.setEmail("admin@app.com");
            admin.setPassword(encoder.encode("password"));
            admin.setRole("ADMIN");

            User user = new User();
            user.setEmail("user@app.com");
            user.setPassword(encoder.encode("password"));
            user.setRole("USER");

            userRepository.save(admin);
            userRepository.save(user);

        }


        if (hotelRepository.count() == 0) {
            Hotel hotel1 = new Hotel();
            hotel1.setCity("Amsterdam");
            hotel1.setName("Ams hotel");
            hotel1.setTotalRooms(200);
            hotel1.setAvailableRooms(122);
            hotel1.setPrice(100);
            hotel1.setType(ProductType.HOTEL);

            Hotel hotel2 = new Hotel();
            hotel2.setCity("Paris");
            hotel2.setName("Par hotel");
            hotel2.setTotalRooms(200);
            hotel2.setAvailableRooms(92);
            hotel2.setPrice(90);
            hotel2.setType(ProductType.HOTEL);

            Hotel hotel3 = new Hotel();
            hotel3.setCity("Amsterdam");
            hotel3.setName("Ams hotel 2");
            hotel3.setTotalRooms(3);
            hotel3.setAvailableRooms(3);
            hotel3.setPrice(330);
            hotel3.setType(ProductType.HOTEL);

            Hotel hotel4 = new Hotel();
            hotel4.setCity("Amsterdam");
            hotel4.setName("Ams hotel 3");
            hotel4.setTotalRooms(200);
            hotel4.setAvailableRooms(87);
            hotel4.setPrice(330);
            hotel4.setType(ProductType.HOTEL);

            hotelRepository.saveAll(Arrays.asList(hotel1, hotel2, hotel3, hotel4));
        }


    }
}
