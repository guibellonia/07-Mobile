package com.example.projeto.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import com.example.projeto.model.Produto;
import com.example.projeto.service.ProdutoService;

@Controller
@RequestMapping("/produtos")
public class ProdutoWebController {

    private final ProdutoService service;

    public ProdutoWebController(ProdutoService service) {
        this.service = service;
    }

    @GetMapping("/listar")
    public String listar(Model model) {
        model.addAttribute("lista", service.listarProdutos());
        return "produtos/lista";
    }

    @GetMapping("/cadastrar")
    public String form(Model model) {
        model.addAttribute("produto", new Produto());
        return "produtos/form";
    }

    @PostMapping("/cadastrar")
    public String salvar(@ModelAttribute Produto produto) {
        service.salvarProduto(produto);
        return "redirect:/produtos/listar";
    }

    @GetMapping("/{id}")
    public String detalhe(@PathVariable Long id, Model model) {
        service.buscarPorId(id).ifPresent(p -> model.addAttribute("produto", p));
        return "produtos/detalhe";
    }

    @PostMapping("/{id}/excluir")
    public String excluir(@PathVariable Long id) {
        service.deletarProduto(id);
        return "redirect:/produtos/listar";
    }
}