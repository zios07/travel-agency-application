package common.server.domain;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductPhoto {

    @Id @GeneratedValue
    private long id;

    @Lob
    @Type(type = "org.hibernate.type.ImageType")
    private byte[] photo;

    private String contentType;

}
