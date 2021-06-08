package common.server.domain;


import lombok.AllArgsConstructor;
import lombok.Data;

import javax.persistence.Entity;
import java.time.LocalDate;

@Entity
@Data
@AllArgsConstructor
public class Ticket extends Product {

    public Ticket() {
    }

    private String departure;

    private String destination;

    private LocalDate date;

    private int hour;

    private String company;

}
