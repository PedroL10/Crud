package br.com.pedro.projeto.service;

import br.com.pedro.projeto.dto.UsuarioDTO;
import br.com.pedro.projeto.entity.UsuarioEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import br.com.pedro.projeto.repository.UsuarioRepository;
import java.util.List;

@Service
public class UsuarioService {

    @Autowired
    public UsuarioRepository usuarioRepository;

    public List<UsuarioDTO> listarTodos(){
        List<UsuarioEntity> usuarios = usuarioRepository.findAll();
        return usuarios.stream().map(UsuarioDTO::new).toList();
    }

    public UsuarioDTO listarPorId(Long id){
        UsuarioEntity usuarioEntity = usuarioRepository.findById(id).orElseThrow();
        return new UsuarioDTO(usuarioEntity);
    }

    public void inserir(UsuarioDTO usuarioDTO){
        UsuarioEntity usuarioEntity = new UsuarioEntity(usuarioDTO);
        usuarioRepository.save(usuarioEntity);
    }

    public UsuarioDTO alterar(UsuarioDTO usuarioDTO){
        UsuarioEntity usuarioEntity = new UsuarioEntity(usuarioDTO);
        return new UsuarioDTO(usuarioRepository.save(usuarioEntity));
    }
    public void deletar(Long id){
        UsuarioEntity usuarioEntity = usuarioRepository.findById(id).orElseThrow();
        usuarioRepository.deleteById(id);
    }

}
