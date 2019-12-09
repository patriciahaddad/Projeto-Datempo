using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Backend.Domains;
using Backend.Repositories;
using Backend.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers {
    //Definimos nossa rota do controller e dizemos que é um controller de API
    [Route ("api/[controller]")]
    [ApiController]
    public class OfertaController : ControllerBase {
        OfertaRepository _repositorio = new OfertaRepository ();
        UploadRepository _uploadRepo = new UploadRepository ();

        /// <summary>
        /// Pegamos as ofertas cadastradas
        /// </summary>
        /// <returns>Lista de ofertas cadastradas</returns>
        [HttpGet]
        public async Task<ActionResult<List<Oferta>>> Get () {

            var ofertas = await _repositorio.Listar ();

            if (ofertas == null) {
                return NotFound (new { mensagem = "Oferta não encontrado", Erro = true });
            }
            return ofertas;
        }

        /// <summary>
        /// Pegamos uma oferta de acordo com o ID
        /// </summary>
        /// <param name="id">Passar ID</param>
        /// <returns>Buscar oferta por ID</returns>
        [HttpGet ("{id}")]
        public async Task<ActionResult<Oferta>> Get (int id) {
            var oferta = await _repositorio.BuscarPorID (id);

            if (oferta == null) {
                return NotFound (new { mensagem = "Id da Oferta não encontrado", Erro = true });
            }
            return oferta;
        }

        /// <summary>
        /// Cadastramos uma nova oferta
        /// </summary>
        /// <param name="oferta">Passar objeto oferta</param>
        /// <returns>Cadastro de oferta</returns>
        // [Authorize (Roles = "Fornecedor")]
        [HttpPost]
        public async Task<ActionResult<Oferta>> Post ([FromForm] Oferta oferta) {
            try {
                if (oferta.Validade > DateTime.Now.AddDays (10)) {
                    var arquivo = Request.Form.Files[0];

                    oferta.NomeOferta = Request.Form["nomeOferta"].ToString ();
                    oferta.Marca = Request.Form["marca"].ToString ();
                    oferta.Preco = decimal.Parse (Request.Form["Preco"]);
                    oferta.Validade = DateTime.Parse (Request.Form["Validade"]);
                    oferta.QuantVenda = int.Parse (Request.Form["quantVenda"]);
                    oferta.Descricao = Request.Form["descricao"].ToString ();
                    oferta.Imagem = _uploadRepo.Upload (arquivo, "imgOferta");
                    await _repositorio.Salvar (oferta);
                } else {
                    return BadRequest (new { mensagem = "Produto fora da validade exigida" });
                }
            } catch (DbUpdateConcurrencyException) {
                return BadRequest (new { mensagem = "Não foi possivel realizar o cadastro", Erro = true });
            }
            return oferta;
        }

        /// <summary>
        /// Alteramos a oferta de acordo com o ID
        /// </summary>
        /// <param name="id">Passar ID</param>
        /// <param name="oferta">Passar objeto oferta</param>
        /// <returns>Alterar oferta</returns>
        // [Authorize (Roles = "Fornecedor")]
        [HttpPut ("{id}")]
        public async Task<ActionResult> Put (int id, [FromForm] Oferta oferta) {
            if (id != oferta.IdOferta) {
                return BadRequest (new { mensagem = "Oferta não encontrado", Erro = true });
            }
            try {
                var arquivo = Request.Form.Files[0];

                oferta.NomeOferta = Request.Form["nomeOferta"].ToString ();
                oferta.Marca = Request.Form["marca"].ToString ();
                oferta.Preco = decimal.Parse (Request.Form["Preco"]);
                oferta.Validade = DateTime.Parse (Request.Form["Validade"]);
                oferta.QuantVenda = int.Parse (Request.Form["quantVenda"]);
                oferta.Descricao = Request.Form["descricao"].ToString ();
                oferta.Imagem = _uploadRepo.Upload (arquivo, "imgOferta");
                
                await _repositorio.Alterar (oferta);
            } catch (DbUpdateConcurrencyException) {
                var oferta_valido = await _repositorio.BuscarPorID (id);

                if (oferta_valido == null) {
                    return NotFound (new { mensagem = "Oferta não encontrado", Erro = true });
                } else {
                    throw;
                }
            }
            return Ok ("Oferta atualizada com sucesso!!!");
        }

        /// <summary>
        /// Deletamos a oferta de acordo com o ID
        /// </summary>
        /// <param name="id">Passar ID</param>
        /// <returns>Deletar oferta</returns>
        // [Authorize (Roles = "Fornecedor")]
        [HttpDelete ("{id}")]
        public async Task<ActionResult<Oferta>> Delete (int id) {
            var oferta = await _repositorio.BuscarPorID (id);
            if (oferta == null) {
                return NotFound ();
            }
            await _repositorio.Excluir (oferta);
            return oferta;
        }
    }
}