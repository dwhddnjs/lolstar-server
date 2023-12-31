import { getUserId } from 'src/decorator/get-user-id.decorator';
import { PlayersDto } from './dto/players-dto';
import { RosterService } from './roster.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AtGuard } from 'src/guards/at.guard';
import { UpdateRosterDto } from './dto/update-roster-dto';

@Controller('roster')
export class RosterController {
  constructor(private readonly rosterService: RosterService) {}

  @Get()
  getPlayer() {
    return this.rosterService.getPlayer();
  }

  @Post()
  @UseGuards(AtGuard)
  saveRoster(@Body() playersDto: PlayersDto, @getUserId() userId: string) {
    return this.rosterService.saveRoster(playersDto, userId);
  }

  @Get('saved')
  @UseGuards(AtGuard)
  getSavedRoster(@getUserId() userId: string) {
    return this.rosterService.getSavedRoster(userId);
  }

  @Delete('/:id')
  @UseGuards(AtGuard)
  removeRoster(@Param('id') rosterId: string, @getUserId() userId: string) {
    return this.rosterService.removeRoster(rosterId, userId);
  }

  @Put()
  @UseGuards(AtGuard)
  updateRoster(
    @Body() updateRosterDto: UpdateRosterDto,
    @getUserId() userId: string,
  ) {
    return this.rosterService.updateRoster(updateRosterDto, userId);
  }
}
