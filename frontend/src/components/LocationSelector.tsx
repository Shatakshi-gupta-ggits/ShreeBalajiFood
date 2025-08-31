
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Phone, ChevronDown } from 'lucide-react';
import { useLocation } from '@/contexts/LocationContext';

const LocationSelector = () => {
  const { selectedOutlet, outlets, setSelectedOutlet } = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 min-w-64"
      >
        <MapPin className="w-4 h-4" />
        <div className="text-left">
          <div className="font-medium">{selectedOutlet.name}</div>
          <div className="text-xs text-gray-500">{selectedOutlet.address}</div>
        </div>
        <ChevronDown className="w-4 h-4 ml-auto" />
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50">
          <Card className="shadow-lg">
            <CardContent className="p-0">
              {outlets.map((outlet) => (
                <div
                  key={outlet.id}
                  className={`p-4 cursor-pointer hover:bg-gray-50 border-b last:border-b-0 ${
                    selectedOutlet.id === outlet.id ? 'bg-orange-50' : ''
                  }`}
                  onClick={() => {
                    setSelectedOutlet(outlet);
                    setIsOpen(false);
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800">{outlet.name}</h3>
                      <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                        <MapPin className="w-3 h-3" />
                        <span>{outlet.address}</span>
                      </div>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Clock className="w-3 h-3" />
                          <span>{outlet.deliveryTime}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Phone className="w-3 h-3" />
                          <span>{outlet.phone}</span>
                        </div>
                      </div>
                    </div>
                    {selectedOutlet.id === outlet.id && (
                      <Badge className="bg-orange-500">Selected</Badge>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;
