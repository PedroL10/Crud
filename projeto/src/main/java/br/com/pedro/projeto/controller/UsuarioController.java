package br.com.pedro.projeto.controller;

import br.com.pedro.projeto.service.UsuarioService;
import br.com.pedro.projeto.dto.UsuarioDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuario")
@CrossOrigin
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public List<UsuarioDTO> listarTodos(){
        return usuarioService.listarTodos();
    }
    @GetMapping("/{id}")
    public UsuarioDTO listarPorId(@PathVariable  Long id){
        return usuarioService.listarPorId(id);
    }
    @PostMapping    
    public void inserir(@RequestBody UsuarioDTO usuarioDTO){
        usuarioService.inserir(usuarioDTO);
    }
    @PutMapping("/{id}")
    public UsuarioDTO alterar(@PathVariable Long id, @RequestBody UsuarioDTO usuarioDTO){
        return usuarioService.alterar(usuarioDTO);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id){
        usuarioService.deletar(id);
        return ResponseEntity.ok().build();
    }
}
