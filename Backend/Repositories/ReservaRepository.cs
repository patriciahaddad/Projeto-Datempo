using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Domains;
using Backend.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories
{
    public class ReservaRepository : IReserva
    {
        public async Task<Reserva> Alterar(Reserva reserva)
        {
            using(bddatempoContext _contexto = new bddatempoContext()){
                //Comparamos os atributos que foram modificados através do EF
                _contexto.Entry(reserva).State = EntityState.Modified;
                await _contexto.SaveChangesAsync();
                return reserva;
            }
        }

        public async Task<Reserva> BuscarPorID(int id)
        {
            using(bddatempoContext _contexto = new bddatempoContext()){
                return await _contexto.Reserva.Include("IdUsuarioNavigation").Include("IdOfertaNavigation").FirstOrDefaultAsync(r => r.IdReserva == id);
            }
        }

        public async Task<Reserva> Excluir(Reserva reserva)
        {
            using(bddatempoContext _contexto = new bddatempoContext()){
                _contexto.Reserva.Remove(reserva);
                await _contexto.SaveChangesAsync();
                return reserva;
            }
        }

        public async Task<List<Reserva>> Listar()
        {
            using(bddatempoContext _contexto = new bddatempoContext()){
                return await _contexto.Reserva.Include("IdUsuarioNavigation").Include("IdOfertaNavigation").ToListAsync();
            }
        }

        public async Task<Reserva> Salvar(Reserva reserva)
        {
            using(bddatempoContext _contexto = new bddatempoContext()){
                // Tratamos contra ataques de SQL Injection
                await _contexto.AddAsync(reserva);
                // Salvamos efetivamente o nosso objeto no banco
                await _contexto.SaveChangesAsync();
                return reserva;
            }
        }
    }
}