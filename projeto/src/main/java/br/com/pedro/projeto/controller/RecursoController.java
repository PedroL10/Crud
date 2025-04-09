package br.com.pedro.projeto.controller;


import br.com.pedro.projeto.dto.RecursoDTO;
import br.com.pedro.projeto.service.RecursoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/recurso")
@CrossOrigin
public class RecursoController {

    @Autowired
    private RecursoService recursoService;

    @GetMapping
    public List<RecursoDTO> listarTodos(){
        return recursoService.listarTodos();
    }

    @PostMapping
    public void inserir(@RequestBody RecursoDTO recurso) {
        recursoService.inserir(recurso);
    }

    @PutMapping("/{id}")
    public RecursoDTO atualizar(@PathVariable Long id, @RequestBody RecursoDTO recurso) {
        return recursoService.atualizar(recurso);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable("id") Long id) {
        recursoService.excluir(id);
        return ResponseEntity.ok().build();
    }
}
