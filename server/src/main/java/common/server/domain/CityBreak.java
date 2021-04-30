package common.server.domain;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "CITY_BREAK_TABLE")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CityBreak {

    @Id
    @GeneratedValue
    private long id;

    private String city;

    private String name;

    private String description;

    private double price;

}
