import { Component, OnInit } from '@angular/core';
import { MapsModule } from '@syncfusion/ej2-angular-maps';
import { MapsTooltipService, DataLabelService } from '@syncfusion/ej2-angular-maps';
import { world_map } from '../world-map';
import { ColorMappingItem, colorMapping } from '../colormapping';

@Component({
  selector: 'app-world-map',
  standalone: true,
  imports: [MapsModule],
  providers: [MapsTooltipService, DataLabelService],
  templateUrl: './world-map.component.html',
  styleUrls: ['./world-map.component.css']
})
export class WorldMapComponent implements OnInit {
  public shapeData?: object;
  public shapeSettings?: object;
  public tooltipSettings?: object;
  public dataLabelSettings?: object;

  private continentsToShow = [
    'Africa', 'Asia', 'Europe', 'North America', 'South America', 'Australia', 'Antarctica'
  ];

  ngOnInit(): void {
    this.shapeData = this.filterContinents(world_map);
    this.shapeSettings = {
      autofill: true,
      colorMapping: this.getColorMapping() // Apply color mapping
    };
    this.dataLabelSettings = {
      visible: true,
      labelPath: 'name',
      smartLabelMode: 'Trim'
    };
    this.tooltipSettings = {
      visible: true,
      valuePath: 'name'
    };
  }

  private filterContinents(worldMapData: any): object {
    const filteredFeatures = worldMapData.features.filter((feature: any) =>
      this.continentsToShow.includes(feature.properties.continent)
    );
    return {
      ...worldMapData,
      features: filteredFeatures
    };
  }

  private getColorMapping(): any[] {
    // Ensure you set the colorMapping based on the property you're using
    return colorMapping.map((item: ColorMappingItem) => ({
      value: item.continent,
      color: item.color,
      min: 0, // Ensure min/max values are set correctly or use a suitable range
      max: 50000
    }));
  }
}
