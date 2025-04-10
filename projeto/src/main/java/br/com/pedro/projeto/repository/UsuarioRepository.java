package br.com.pedro.projeto.repository;

import br.com.pedro.projeto.entity.UsuarioEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<UsuarioEntity, Long> {


    Optional<UsuarioEntity> findByLogin(String login);
}
