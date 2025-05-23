package br.com.pedro.projeto.entity;


import br.com.pedro.projeto.dto.PerfilDTO;
import jakarta.persistence.*;
import org.springframework.beans.BeanUtils;

import java.util.Objects;

@Entity
@Table(name = "TB_PERFIL")
public class PerfilEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private String descricao;

    public PerfilEntity() {}

    public PerfilEntity(PerfilDTO perfil) {
        BeanUtils.copyProperties(perfil, this);
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        PerfilEntity other = (PerfilEntity) obj;
        return Objects.equals(id, other.id);
    }



}