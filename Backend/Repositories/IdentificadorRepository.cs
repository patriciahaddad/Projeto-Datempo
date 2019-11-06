using System;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Repositories
{
    public class IdentificadorRepository : ControllerBase
    {
        public bool  ValidaCPF(string cpfUsuario){

            bool resultado = false;

            int[] v1 = { 10, 9, 8, 7, 6, 5, 4, 3, 2};

            string cpfCalculo = "";
            int resto = 0;
            int calculo = 0;

            string digito_v1 = "";
            string digito_v2 = "";

            cpfUsuario = cpfUsuario.Replace(" ", "");
            cpfUsuario = cpfUsuario.Replace("-", "");
            cpfUsuario = cpfUsuario.Replace(".", "");

            cpfCalculo = cpfUsuario.Substring(0,9);

            for(int i = 0; i <= 8; i++){
                calculo += int.Parse(cpfCalculo[i].ToString()) * v1[i];
            }

            resto = calculo % 11;
            calculo = 11 - resto;

            if(calculo > 9){
                digito_v1 = "0";
            }else{
                digito_v1 = calculo.ToString();
            }

            if(digito_v1 == cpfUsuario[9].ToString()){
                resultado = true;
            }

            int[] v2 = { 11, 10, 9, 8, 7, 6, 5, 4, 3, 2};
            resto = 0;

            cpfCalculo = cpfCalculo + calculo.ToString();
            calculo = 0;

            for(int i = 0; i <= 9; i++){
                calculo += int.Parse(cpfCalculo[i].ToString()) * v2[i];
            }

            resto = calculo % 11;
            calculo = 11 - resto;

            if(calculo > 9){
                digito_v2 = "0";
            }else{
                digito_v2 = calculo.ToString();
            }

            if(digito_v2 == cpfUsuario[10].ToString()){
                resultado = true;
            }else{
                resultado = false;
            }

            return resultado;
        }
    }
}