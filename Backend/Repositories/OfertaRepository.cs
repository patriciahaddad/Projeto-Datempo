using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Domains;
using Backend.Interfaces;
using Backend.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories
{
    public class OfertaRepository : IOferta
    {
        public async Task<Oferta> Alterar(Oferta oferta)
        {
            using(bddatempoContext _contexto = new bddatempoContext()){
                //Comparamos os atributos que foram modificados através do EF
                _contexto.Entry(oferta).State = EntityState.Modified;
                await _contexto.SaveChangesAsync();
                return oferta;
            }
        }

        public async Task<Oferta> BuscarPorID(int id)
        {
            using(bddatempoContext _contexto = new bddatempoContext()){
                return await _contexto.Oferta.Include("IdUsuarioNavigation").Include("IdProdutoNavigation").FirstOrDefaultAsync(o => o.IdOferta == id);
            }
        }

        public async Task<Oferta> Excluir(Oferta oferta)
        {
            using(bddatempoContext _contexto = new bddatempoContext()){
                _contexto.Oferta.Remove(oferta);
                await _contexto.SaveChangesAsync();
                return oferta;
            }
        }

        public async Task<List<Oferta>> Listar()
        {
            using(bddatempoContext _contexto = new bddatempoContext()){
                return await _contexto.Oferta.Include("IdUsuarioNavigation").Include("IdProdutoNavigation").ToListAsync();
            }
        }

        public async Task<Oferta> Salvar(Oferta oferta)
        {
            using(bddatempoContext _contexto = new bddatempoContext()){
                await _contexto.AddAsync(oferta);
                await _contexto.SaveChangesAsync();
                return oferta;
            }
        }

        // public async Task<List<Oferta>> Filtrar()
        // {
        //     using(bddatempoContext _contexto = new bddatempoContext()){
        //        FiltroViewModel filtro = new FiltroViewModel();
        //        List<Oferta> ofertas = new List<Oferta>();
        //        ofertas = _contexto.Oferta.Where(o => o.NomeOferta.Contains(filtro.Palavra)).ToList();
        //        return ofertas;
        //    }
        // }

    }
}