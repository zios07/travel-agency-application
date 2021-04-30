package common.server.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "HOTEL_BOOKING_TABLE")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class HotelBooking {

    @Id
    @GeneratedValue
    private long id;

    @OneToOne
    private Hotel hotel;

    private LocalDate startDate;

    private LocalDate endDate;

    private int nbRooms;

    private double totalPrice;

    @ManyToOne
    private User user;

}








