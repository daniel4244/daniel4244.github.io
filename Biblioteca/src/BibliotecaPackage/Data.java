package BibliotecaPackage;

public class Data {
	private String dia;
	private String mes;
	private String ano;
	
	public Data() {
		
	}
	
	public Data(String dia, String mes, String ano) {
		this();
		this.setDia(dia);
		this.setMes(mes);
		this.setAno(ano);
	}
	
	public String getDataBR(){
		return this.dia + "/" + this.mes + "/" + this.ano; 
	}
	
	public String getDia() {
		return this.dia;
	}
	
	public void setDia(String dia) {
		this.dia = dia;
	}
	
	public String getMes() {
		return this.mes;
	}
	
	public void setMes(String mes) {
		this.mes = mes;
	}
	
	public String getAno() {
		return this.ano;
	}
	
	public void setAno(String ano) {
		this.ano = ano;
	}
	
	
}
