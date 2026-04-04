package BibliotecaPackage;

public class Main {
	public static void main(String[] args) {
		Biblioteca biblioteca = new Biblioteca();
		Editora editora = new Editora("Arqueiro");
		Assunto assunto = new Assunto("Fantasia");
		Autor autor = new Autor("Patrick Rotfuss");
		
		Livro livro1 = new Livro("O Nome do Vento", "2014", editora, assunto);
		livro1.adicionarAutor(autor);
		livro1.mostrarDados();
		
		System.out.println();
		
		Aluno aluno1 = new Aluno("Fabricio", "GSIS20245467");
		aluno1.getCidade().setNome("Taquara preta");
		aluno1.getDataDeNascimento().setDia("12");
		aluno1.getDataDeNascimento().setMes("05");
		aluno1.getDataDeNascimento().setAno("2002");
		aluno1.mostrarDados();

		System.out.println();
		
		Exemplar exemplar1 = new Exemplar(livro1, Status.DISPONIVEL);
		exemplar1.mostraDados();
		
		System.out.println();
		
		Funcionario recepcionista = new Funcionario("Marina");
		Data dataEmprestimo = new Data("10", "08", "2025");
		biblioteca.realizarEmprestimo(exemplar1, recepcionista, aluno1, dataEmprestimo);
		
		for(Emprestimo e: biblioteca.getEmprestimos()) {
			e.mostrarDados();
		}
		
		System.out.println();
		
		Data dataDevolucao = new Data("20", "08", "2025");
		biblioteca.realizarDevolucao(exemplar1, aluno1, dataDevolucao);
		
		for(Emprestimo e: biblioteca.getEmprestimos()) {
			if(e.getDataDevolucao().getAno() != null) {
				e.mostrarDados();
			}
		}
	}
}
