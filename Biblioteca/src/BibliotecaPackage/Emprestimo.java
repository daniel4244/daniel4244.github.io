package BibliotecaPackage;

public class Emprestimo {
	private Exemplar exemplar = new Exemplar();
	private Aluno aluno = new Aluno();
	private Funcionario funcionario = new Funcionario();
	private Data dataEmprestimo = new Data();
	private Data dataDevolucao = new Data();
	
	public Emprestimo() {
		
	}
	
	public Emprestimo(Exemplar exemplar) {
		this();
		this.setExemplar(exemplar);
	}
	
	public Emprestimo(Exemplar exemplar, Aluno aluno) {
		this(exemplar);
		this.setAluno(aluno);
	}
	
	public Emprestimo(Exemplar exemplar, Aluno aluno, Funcionario funcionario) {
		this(exemplar, aluno);
		this.setFuncionario(funcionario);
	}
	
	public Emprestimo(Exemplar exemplar, Aluno aluno, Funcionario funcionario, Data dataEmprestimo) {
		this(exemplar, aluno, funcionario);
		this.setDataEmprestimo(dataEmprestimo);
	}
	
	public Emprestimo(Exemplar exemplar, Aluno aluno, Funcionario funcionario, Data dataEmprestimo, Data dataDevolucao) {
		this(exemplar, aluno, funcionario, dataEmprestimo);
		this.setDataDevolucao(dataDevolucao);
	}
	
	public Exemplar getExemplar() {
		return this.exemplar;
	}
	
	public void setExemplar(Exemplar exemplar) {
		this.exemplar = exemplar;
	}
	
	public Aluno getAluno() {
		return this.aluno;
	}
	
	public void setAluno(Aluno aluno) {
		this.aluno = aluno;
	}
	
	public Funcionario getFuncionario() {
		return this.funcionario;
	}
	
	public void setFuncionario(Funcionario funcionario) {
		this.funcionario = funcionario;
	}
	
	public Data getDataEmprestimo() {
		return this.dataEmprestimo;
	}
	
	public void setDataEmprestimo(Data dataEmprestimo) {
		this.dataEmprestimo = dataEmprestimo;
	}
	
	public Data getDataDevolucao() {
		return this.dataDevolucao;
	}
	
	public void setDataDevolucao(Data dataDevolucao) {
		this.dataDevolucao = dataDevolucao;
	}
	
	public void mostrarDados() {
		System.out.println("Exemplar: " + this.exemplar.getLivro().getTitulo());
		System.out.println("Aluno: " + this.aluno.getNome());
		System.out.println("Matricula: " + this.aluno.getMatricula());
		System.out.println("Recepcionista: " + this.funcionario.getNome());
		System.out.println("Data do Empréstimo: " + this.dataEmprestimo.getDataBR());
		
		if(this.dataDevolucao.getAno() != null) {
			System.out.println("Data da Devolução: " + this.dataDevolucao.getDataBR());
		}
		
		else {
			System.out.println("Não devolvido!");
		}
	}
}
