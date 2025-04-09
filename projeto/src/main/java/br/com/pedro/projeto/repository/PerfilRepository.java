package br.com.pedro.projeto.repository;

import br.com.pedro.projeto.entity.PerfilEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PerfilRepository extends JpaRepository<PerfilEntity, Long> {

}
