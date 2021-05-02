package common.server.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "BOOKING_TABLE")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Booking {

    @Id
    @GeneratedValue
    private long id;

    @OneToOne
    private Product product;

    private LocalDate startDate;

    private LocalDate endDate;

    private boolean confirmed;

    @ManyToOne
    private User user;


}








