package BibliotecaPackage;

public class Cidade {
	private String nome;

	public Cidade() {
		
	}
	
	public Cidade(String nome) {
		this();
		this.setNome(nome);
	}
	
	public String getNome() {
		return this.nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

}
