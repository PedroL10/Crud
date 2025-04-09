package br.com.pedro.projeto.entity;

import br.com.pedro.projeto.dto.PerfilUsuarioDTO;
import jakarta.persistence.*;
import org.springframework.beans.BeanUtils;

@Entity
@Table(name = "TB_PERFIL_USUARIO")
public class PerfilUsuarioEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "ID_USUARIO")
    private UsuarioEntity usuario;

    @ManyToOne
    @JoinColumn(name = "ID_PERFIL")
    private PerfilEntity perfil;

    public PerfilUsuarioEntity(PerfilUsuarioDTO perfilUsuario) {
        BeanUtils.copyProperties(perfilUsuario, this);
        if(perfilUsuario != null && perfilUsuario.getUsuario() != null) {
            this.usuario = new UsuarioEntity(perfilUsuario.getUsuario());
        }
        if(perfilUsuario != null && perfilUsuario.getPerfil() != null) {
            this.perfil = new PerfilEntity(perfilUsuario.getPerfil());
        }
    }

    public PerfilUsuarioEntity() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UsuarioEntity getUsuario() {
        return usuario;
    }

    public void setUsuario(UsuarioEntity usuario) {
        this.usuario = usuario;
    }

    public PerfilEntity getPerfil() {
        return perfil;
    }

    public void setPerfil(PerfilEntity perfil) {
        this.perfil = perfil;
    }



}