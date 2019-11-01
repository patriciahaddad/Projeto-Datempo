using System;
using System.Collections.Generic;
using System.IO;
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
using upload_dotnet.Controllers;
using System.Linq;

namespace backend.Controllers
{
    //Definimos nossa rota do controller e dizemos que é um controller de API
    [Route("api/[controller]")]
    [ApiController]
    public class OfertaController : ControllerBase
    {
        OfertaRepository _repositorio = new OfertaRepository();
        UploadController _upload = new UploadController();

        // GET: api/Oferta
        [HttpGet]
        public async Task<ActionResult<List<Oferta>>> Get()
        {
            var ofertas = await _repositorio.Listar();

            if(ofertas == null){
                return NotFound();
            }

            return ofertas;
        }
        // GET: api/Oferta/2
        [HttpGet("{id}")]
        public async Task<ActionResult<Oferta>> Get(int id)
        {
            var oferta = await _repositorio.BuscarPorID(id);

            if(oferta == null){
                return NotFound();
            }

            return oferta;
        }

        //
        //POST api/Oferta
        [Authorize(Roles = "Fornecedor")]
        [HttpPost]
        public async Task<ActionResult<Oferta>> Post([FromForm]Oferta oferta){
            try{
                oferta.Imagem=_upload.Upload();
                // Tratamos contra ataques de SQL Injection
                await _repositorio.Salvar(oferta);
            }catch(DbUpdateConcurrencyException){
                throw;
            }
            return oferta;
        }

        //Update
        [Authorize(Roles = "Fornecedor")]
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, Oferta oferta){
            // Se o Id do objeto não existir, ele retorna erro 400
            if(id != oferta.IdOferta){
                return BadRequest();
            }
            try{
                await _repositorio.Alterar(oferta);
            }catch(DbUpdateConcurrencyException){
                // Verificamos se o objeto inserido realmente existe no banco
                var oferta_valido = await _repositorio.BuscarPorID(id);

                if(oferta_valido == null){
                    return NotFound();
                }else{
                    throw;
                }
            }
            // NoContent = Retorna 204, sem nada
            return NoContent();
        }

        //DELETE api/oferta/id
        [Authorize(Roles = "Fornecedor")]
        [HttpDelete("{id}")]
        public async Task<ActionResult<Oferta>> Delete(int id){
            var oferta = await _repositorio.BuscarPorID(id);
            if(oferta == null){
                return NotFound();
            }
            await _repositorio.Excluir(oferta);

            return oferta;
        }
    }
}