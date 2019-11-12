using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Domains;
using Backend.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers {
    //Definimos nossa rota do controller e dizemos que é um controller de API
    [Route ("api/[controller]")]
    [ApiController]
    public class ReservaController : ControllerBase {
        ReservaRepository _repositorio = new ReservaRepository ();

        /// <summary>
        /// Pegamos as reservas cadastradas
        /// </summary>
        /// <returns>Lista de reservas cadastradas</returns>
        [HttpGet]
        public async Task<ActionResult<List<Reserva>>> Get () {
            var reservas = await _repositorio.Listar ();

            if (reservas == null) {
                return NotFound (new { mensagem = "Reserva não encontrada", Erro = true });
            }

            return reservas;
        }

        /// <summary>
        /// Pegamos uma reserva de acordo com o ID
        /// </summary>
        /// <param name="id">Passar ID</param>
        /// <returns>Buscar reserva por ID</returns>
        [HttpGet ("{id}")]
        public async Task<ActionResult<Reserva>> Get (int id) {
            var reserva = await _repositorio.BuscarPorID (id);

            if (reserva == null) {
                return NotFound (new { mensagem = "Id de reserva não encontrado", Erro = true });
            }

            return reserva;
        }

        /// <summary>
        /// Cadastramos uma nova reserva
        /// </summary>
        /// <param name="reserva">Passar objeto reserva</param>
        /// <returns>Cadastro de reserva</returns>
        [HttpPost]
        public async Task<ActionResult<Reserva>> Post (Reserva reserva) {
            try {
                await _repositorio.Salvar (reserva);
            } catch (DbUpdateConcurrencyException) {
                return BadRequest (new { mensagem = "Não foi possivel realizar a reserva", Erro = true });

            }
            return reserva;
        }

        /// <summary>
        /// Alteramos uma reserva de acordo com o ID
        /// </summary>
        /// <param name="id">Passar ID</param>
        /// <param name="reserva">Passar objeto reserva</param>
        /// <returns>Alterar reserva</returns>
        [HttpPut ("{id}")]
        public async Task<ActionResult> Put (int id, Reserva reserva) {
            if (id != reserva.IdReserva) {
                return BadRequest (new { mensagem = "Reserva não encontrada", Erro = true });
            }
            try {
                await _repositorio.Alterar (reserva);
            } catch (DbUpdateConcurrencyException) {
                var reserva_valido = await _repositorio.BuscarPorID (id);

                if (reserva_valido == null) {
                    return NotFound (new { mensagem = "Reserva não valido", Erro = true });
                } else {
                    throw;
                }
            }
            return Ok ("Alteração da reserva feita com sucesso");
        }

        /// <summary>
        /// Deletamos uma reserva de acordo com o ID
        /// </summary>
        /// <param name="id">Passar ID</param>
        /// <returns>Deletar reserva</returns>
        [HttpDelete ("{id}")]
        public async Task<ActionResult<Reserva>> Delete (int id) {
            var reserva = await _repositorio.BuscarPorID (id);
            if (reserva == null) {
                return NotFound (new { mensagem = " não encontrada", Erro = true });
            }
            await _repositorio.Excluir (reserva);

            return reserva;
        }
    }
}