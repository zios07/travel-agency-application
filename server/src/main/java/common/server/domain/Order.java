package common.server.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "ORDER_TABLE")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Order {

    @Id
    @GeneratedValue
    private long id;

    @OneToMany
    private List<HotelBooking> hotelBookings;

    private double price;

    private LocalDateTime dateTime;

}
