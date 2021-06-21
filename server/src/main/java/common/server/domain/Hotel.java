package common.server.domain;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Lob;
import javax.persistence.OneToOne;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Hotel extends Product {

    private String name;

    private String city;

    private int totalRooms;

    private int availableRooms;

    @OneToOne(cascade = CascadeType.ALL)
    private ProductPhoto photo;

}
