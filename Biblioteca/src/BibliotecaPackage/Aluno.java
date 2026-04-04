package BibliotecaPackage;

public class Aluno {
	private String nome;
	private String matricula;
	private Cidade cidade = new Cidade();
	private Data dataDeNascimento = new Data();
	
	public Aluno() {
		
	}
	
	public Aluno(String nome) {
		this();
		this.setNome(nome);
	}
	
	public Aluno(String nome, String matricula) {
		this(nome);
		this.setMatricula(matricula);
	}
	
	public Aluno(String nome, String matricula, Cidade cidade) {
		this(nome, matricula);
		this.setCidade(cidade);
	}
	
	public Aluno(String nome, String matricula, Cidade cidade, Data dataDeNascimento) {
		this(nome, matricula, cidade);
		this.setDataDeNascimento(dataDeNascimento);
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getMatricula() {
		return matricula;
	}

	public void setMatricula(String matricula) {
		this.matricula = matricula;
	}

	public Cidade getCidade() {
		return cidade;
	}

	public void setCidade(Cidade cidade) {
		this.cidade = cidade;
	}

	public Data getDataDeNascimento() {
		return dataDeNascimento;
	}

	public void setDataDeNascimento(Data dataDeNascimento) {
		this.dataDeNascimento = dataDeNascimento;
	}
	
	public void mostrarDados() {
		System.out.println("Nome: " + this.nome);
		System.out.println("Matricula: " + this.matricula);
		System.out.println("Data de Nascimento: " + this.dataDeNascimento.getDataBR());
		System.out.println("Cidade: " + this.cidade.getNome());
	}
}
