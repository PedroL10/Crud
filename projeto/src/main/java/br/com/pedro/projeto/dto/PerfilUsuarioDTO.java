package br.com.pedro.projeto.dto;


import br.com.pedro.projeto.entity.PerfilUsuarioEntity;
import org.springframework.beans.BeanUtils;

public class PerfilUsuarioDTO {

    private Long id;
    private UsuarioDTO usuario;
    private PerfilDTO perfil;

    public PerfilUsuarioDTO() {	}

    public PerfilUsuarioDTO(PerfilUsuarioEntity perfilUsuario) {
        BeanUtils.copyProperties(perfilUsuario, this);
        if(perfilUsuario != null && perfilUsuario.getUsuario() != null) {
            this.usuario = new UsuarioDTO(perfilUsuario.getUsuario());
        }
        if(perfilUsuario != null && perfilUsuario.getPerfil() != null) {
            this.perfil = new PerfilDTO(perfilUsuario.getPerfil());
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UsuarioDTO getUsuario() {
        return usuario;
    }

    public void setUsuario(UsuarioDTO usuario) {
        this.usuario = usuario;
    }

    public PerfilDTO getPerfil() {
        return perfil;
    }

    public void setPerfil(PerfilDTO perfil) {
        this.perfil = perfil;
    }



}