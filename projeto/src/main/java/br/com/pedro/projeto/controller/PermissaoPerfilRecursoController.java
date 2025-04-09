package br.com.pedro.projeto.controller;


import br.com.pedro.projeto.dto.PermissaoPerfilRecursoDTO;
import br.com.pedro.projeto.service.PermissaoPerfilRecursoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/permissao-perfil-recurso")
@CrossOrigin
public class PermissaoPerfilRecursoController {

    @Autowired
    private PermissaoPerfilRecursoService permissaoPerfilRecursoService;

    @GetMapping
    public List<PermissaoPerfilRecursoDTO> listarTodos(){
        return permissaoPerfilRecursoService.listarTodos();
    }

    @PostMapping
    public void inserir(@RequestBody PermissaoPerfilRecursoDTO permissaoPerfilRecurso) {
        permissaoPerfilRecursoService.inserir(permissaoPerfilRecurso);
    }

    @PutMapping("/{id}")
    public PermissaoPerfilRecursoDTO alterar(@PathVariable Long id, @RequestBody PermissaoPerfilRecursoDTO permissaoPerfilRecurso) {
        return permissaoPerfilRecursoService.alterar(permissaoPerfilRecurso);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable("id") Long id) {
        permissaoPerfilRecursoService.excluir(id);
        return ResponseEntity.ok().build();
    }

}