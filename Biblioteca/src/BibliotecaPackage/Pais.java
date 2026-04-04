package BibliotecaPackage;

public class Pais {
	private String nome;
	
	public Pais() {
		
	}
	
	public Pais(String nome) {
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
