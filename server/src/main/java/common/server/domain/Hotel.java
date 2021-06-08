package common.server.domain;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Hotel extends Product {

    private String name;

    private String city;

    private int totalRooms;

    private int availableRooms;

}
