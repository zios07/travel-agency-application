package common.server.domain;


import lombok.AllArgsConstructor;
import lombok.Data;

import javax.persistence.Entity;
import java.time.LocalDate;

@Entity
@Data
@AllArgsConstructor
public class CityBreak extends Product {

    public CityBreak() {
    }

    private String name;

    private String city;

    private LocalDate date;

    private Integer availableCount;

}
