package br.com.pedro.projeto.repository;

import br.com.pedro.projeto.entity.PerfilUsuarioEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PerfilUsuarioRepository extends JpaRepository<PerfilUsuarioEntity, Long> {
}
