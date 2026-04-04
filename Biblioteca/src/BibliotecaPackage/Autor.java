package BibliotecaPackage;

public class Autor {
	private Pais pais = new Pais();
	private String nome;
	private Data dataDeNascimento = new Data();
	
	public Autor() {
		
	}
	
	public Autor(String nome) {
		this();
		this.setNome(nome);
	}
	
	public Autor(String nome, Pais pais) {
		this(nome);
		this.setPais(pais);
	}
	
	public Autor(String nome, Pais pais, Data dataDeNascimento) {
		this(nome, pais);
		this.setDataDeNascimento(dataDeNascimento);
	}
	
	public Pais getPais() {
		return this.pais;
	}
	
	public void setPais(Pais pais) {
		this.pais = pais;
	}
	
	public String getNome() {
		return this.nome;
	}
	
	public void setNome(String nome) {
		this.nome = nome;
	}
	
	public Data getDataDeNascimento() {
		return this.dataDeNascimento;
	}
	
	public void setDataDeNascimento(Data dataDeNascimento) {
		this.dataDeNascimento = dataDeNascimento;
	}
	
	
}
