namespace Backend.Models
{
  public class TravelEntry
  {
    public int    ID          { get; set; }
    public string Location    { get; set; }
    public DateTime Date      { get; set; }
    public string Description { get; set; }
    public string Photos      { get; set; }  
  }
}
