package br.com.pedro.projeto.entity;

import jakarta.persistence.*;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "USUARIO_VERIFICADOR")
public class UsuarioVerificadorEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private UUID uuid;

    @Column(nullable = false)
    private Instant dataExpiracao;

    @ManyToOne
    @JoinColumn(name = "ID_USUARIO", referencedColumnName = "ID", unique = true)
    private UsuarioEntity usuario;


    public UsuarioVerificadorEntity() {
    }

    public UsuarioVerificadorEntity(UUID uuid, Instant dataExpiracao, UsuarioEntity usuario) {
        this.uuid = uuid;
        this.dataExpiracao = dataExpiracao;
        this.usuario = usuario;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UUID getUuid() {
        return uuid;
    }

    public void setUuid(UUID uuid) {
        this.uuid = uuid;
    }
    public Instant getDataExpiracao() {
        return dataExpiracao;
    }
    public void setDataExpiracao(Instant dataExpiracao) {
        this.dataExpiracao = dataExpiracao;
    }
    public UsuarioEntity getUsuario() {
        return usuario;
    }
    public void setUsuario(UsuarioEntity usuario) {
        this.usuario = usuario;
    }
    @Override
    public String toString() {
        return "UsuarioVerificadorEntity{" +
                "id=" + id +
                ", uuid=" + uuid +
                ", dataExpiracao=" + dataExpiracao +
                ", usuario=" + usuario +
                '}';
    }
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof UsuarioVerificadorEntity that)) return false;

        if (!getId().equals(that.getId())) return false;
        if (!getUuid().equals(that.getUuid())) return false;
        if (!getDataExpiracao().equals(that.getDataExpiracao())) return false;
        return getUsuario().equals(that.getUsuario());
    }

    @Override
    public int hashCode() {
        int result = getId().hashCode();
        result = 31 * result + getUuid().hashCode();
        result = 31 * result + getDataExpiracao().hashCode();
        result = 31 * result + getUsuario().hashCode();
        return result;
    }


}