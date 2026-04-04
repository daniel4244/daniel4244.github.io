package BibliotecaPackage;

import java.util.ArrayList;

public class Biblioteca {
	private ArrayList<Livro> livros = new ArrayList<Livro>();
	private ArrayList<Aluno> alunos = new ArrayList<Aluno>();
	private ArrayList<Exemplar> exemplares = new ArrayList<Exemplar>();
	private ArrayList<Emprestimo> emprestimos = new ArrayList<Emprestimo>();
	
	public Biblioteca() {
		
	}	
	
	public void adicionarLivro(Livro livro) {
		this.livros.add(livro);
	}
	
	public void removerLivro(Livro livro) {
		this.livros.remove(livro);
	}
	
	public Livro getLivro(int posicao) {
		return this.livros.get(posicao);
	}

	public ArrayList<Livro> getLivros(){
		return this.livros;
	}
	
	public void adicionarAluno(Aluno aluno) {
		this.alunos.add(aluno);
	}
	
	public void removerAluno(Aluno aluno) {
		this.alunos.remove(aluno);
	}
	
	public Aluno getAluno(int posicao) {
		return this.alunos.get(posicao);
	}

	public ArrayList<Aluno> getAlunos(){
		return this.alunos;
	}
	
	public void adicionarExemplar(Exemplar exemplar) {
		this.exemplares.add(exemplar);
	}
	
	public void removerExemplar(Exemplar exemplar) {
		this.exemplares.remove(exemplar);
	}
	
	public Exemplar getExemplar(int posicao) {
		return this.exemplares.get(posicao);
	}

	public ArrayList<Exemplar> getExemplares(){
		return this.exemplares;
	}
	
	public void removerEmprestimo(Emprestimo emprestimo) {
		this.emprestimos.remove(emprestimo);
	}
	
	public Emprestimo getEmprestimo(int posicao) {
		return this.emprestimos.get(posicao);
	}

	public ArrayList<Emprestimo> getEmprestimos(){
		return this.emprestimos;
	}
	
	public void realizarEmprestimo(Exemplar exemplar, Funcionario funcionario, Aluno aluno, Data dataEmprestimo) {
		exemplar.setStatus(Status.EMPRESTADO);
		Emprestimo e = new Emprestimo(exemplar, aluno, funcionario, dataEmprestimo);
		this.emprestimos.add(e);
	}
	
	public void realizarDevolucao(Exemplar exemplar, Aluno aluno, Data dataDevolucao) {
		for(Emprestimo e : this.emprestimos) {
			if(e.getAluno()	== aluno && e.getExemplar() == exemplar) {
				e.setDataDevolucao(dataDevolucao);
				exemplar.setStatus(Status.DISPONIVEL);
				return;
			}
		}
	}	
	
}
