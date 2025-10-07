import { useState } from 'react'

import { DialogClose } from '@radix-ui/react-dialog'
import { format } from 'date-fns'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'

export default function Demo() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="min-h-screen space-y-8 bg-surface-secondary p-8">
      <h1 className="text-h2 font-bold text-text-primary">
        Shadcn UI Showcase
      </h1>

      {/* Search & Filter */}
      <div className="flex items-center gap-4">
        <Input placeholder="Search keyword…" className="w-64" />
        <Select>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="uploaded">Uploaded</SelectItem>
            <SelectItem value="done">Done</SelectItem>
          </SelectContent>
        </Select>
        <Button>Search</Button>
      </div>

      {/* DatePicker (Popover + Calendar) */}
      <div>
        <h2 className="text-h3 mb-2 text-text-primary">Pick a Date</h2>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'w-[260px] justify-start text-left font-normal',
                !date && 'text-muted-foreground'
              )}
            >
              {date ? format(date, 'PPP') : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(d) => {
                setDate(d)
              }}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Table with Badges */}
      <div>
        <h2 className="text-h3 mb-2 text-text-primary">Order Records</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>#A3F2K9</TableCell>
              <TableCell>Summer Promo</TableCell>
              <TableCell>
                <Badge variant="secondary">Pending</Badge>
              </TableCell>
              <TableCell>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>#B4EBD4</TableCell>
              <TableCell>Winter Fair</TableCell>
              <TableCell>
                <Badge variant="destructive">Rejected</Badge>
              </TableCell>
              <TableCell>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* Dialog */}
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default">Upload Material</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-text-primary">
                Confirm Upload
              </DialogTitle>
            </DialogHeader>
            <p className="text-sm text-text-secondary">
              Please confirm your order details before uploading.
            </p>
            <DialogFooter className="flex space-x-2">
              <DialogClose asChild>
                <Button variant="secondary">Cancel</Button>
              </DialogClose>
              <Button variant="blue">Confirm Upload</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
