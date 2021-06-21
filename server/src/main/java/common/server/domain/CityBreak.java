package common.server.domain;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.OneToOne;
import java.time.LocalDate;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CityBreak extends Product {

    private String name;

    private String city;

    private LocalDate date;

    private Integer availableCount;

    @OneToOne
    private ProductPhoto photo;

}
