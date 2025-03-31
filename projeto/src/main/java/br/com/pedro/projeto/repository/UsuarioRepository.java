package br.com.pedro.projeto.repository;

import br.com.pedro.projeto.entity.UsuarioEntity;
import org.springframework.data.jpa.repository.JpaRepository;
public interface UsuarioRepository extends JpaRepository<UsuarioEntity, Long> {



}
