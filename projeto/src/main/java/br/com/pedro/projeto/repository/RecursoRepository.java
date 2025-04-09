package br.com.pedro.projeto.repository;

import br.com.pedro.projeto.entity.RecursoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecursoRepository extends JpaRepository<RecursoEntity, Long> {

}
